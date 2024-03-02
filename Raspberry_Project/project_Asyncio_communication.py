import spidevRead_project as sr
import RPi.GPIO as gpio
import socketio
import Adafruit_DHT
import time
import asyncio


## 서버 주소 설정
# SERVER_URL = 'http://211.228.36.207:8000' ## 홍철이형 IP
# SERVER_URL = 'http://121.147.52.247:8000' ## 나의 IP
SERVER_URL = 'http://172.20.10.9:8000' ## 홍철이형 노트북


## socket 통신 설정
sio = socketio.Client()



## socket 통신 함수 정의

@sio.event
def connect():
    print('Connection established')

@sio.event
def disconnect():
    print('Disconnected from server')




## 온습도 센서 설정
sensor = Adafruit_DHT.DHT11
Adafruit_DHT_pin = 3

## gpio mode bcm 설정
gpio.setmode(gpio.BCM)

## gpio I/O 설정
gpio.setup(2, gpio.OUT)  # Output (Buzzer)
gpio.setup(4, gpio.IN)  # Input (Btn)


## MCP3008 채널 설정
batteryChannel = 0
fireChannel_1 = 1
fireChannel_2 = 2
AirChannel = 5
CoChannel = 7

## btn 상태 저장 변수 선언
btn_pressed = 0

## 부저 시간 변수 선언
buzzer_time = 0
buzzer_time_lock = 0

## 온습도 get get 함수 정의
async def get_temp_humi():
    humidity, temperature = Adafruit_DHT.read_retry(sensor, Adafruit_DHT_pin)
    return temperature, humidity

## 아날로그 data get 함수 정의
async def get_analog_data():
    batteryValue = sr.analog_read(batteryChannel)
    fireValue_1 = sr.analog_read(fireChannel_1)
    fireValue_2 = sr.analog_read(fireChannel_2)
    Airvalue = sr.analog_read(AirChannel)
    CoValue = sr.analog_read(CoChannel)
    return batteryValue, fireValue_1, fireValue_2, Airvalue, CoValue


## server send 함수 및 접속 함수 정의
async def send_data_to_server(temperature, humidity, batteryValue, fireValue_1, fireValue_2, airValue, coValue, btnValue):
    if not sio.connected:
        print('Not connected to the server. Reconnecting...')
        try:
            sio.connect(SERVER_URL)
        except Exception as e:
            print(f"An error occurred: {e}. Retrying...")
            return
    sio.emit('sensorData', {'camp_id':'smhrd1', 'deck_num': 1 , 'temperature': temperature,'humidity': humidity,'battery':batteryValue,'fire_1':fireValue_1,'fire_2':fireValue_2,'Air':airValue,'Co':coValue, 'Btn' : btnValue})

async def monitor_button():
    ## 전역변수 btn_pressed 사용
    global btn_pressed
    while True:
        btn = gpio.input(4) ## 버튼 변수 값을 가져옴
        if btn == 1:
            btn_pressed = 1
        await asyncio.sleep(0.002)



async def main():
    ## 전역변수 btn 및 buzzer 사용
    global btn_pressed
    global buzzer_time
    global buzzer_time_lock
    try:
        sio.connect(SERVER_URL)
        while True:
            ## temp, humi, analog data 값을 가져옴
            temp_humi = await get_temp_humi()
            analog_data = await get_analog_data()
            
            if temp_humi and analog_data:
                await send_data_to_server(temp_humi[0], temp_humi[1], analog_data[0], analog_data[1], analog_data[2], analog_data[3], analog_data[4],btn_pressed)
                print(temp_humi[0], temp_humi[1], analog_data[0], analog_data[1], analog_data[2], analog_data[3], analog_data[4], btn_pressed)
                
            else:
                print('센싱 하는데 실패했습니다.')
            
            
            ## 불꽃 감지시에 감지시 부저 타임 15초 증가
            if ((analog_data[1] < 1000) or (analog_data[2] < 1000)) and (buzzer_time_lock == 0):
                buzzer_time += 15
                buzzer_time_lock = 1
            
            ## 유해가스 감지시 부저 타임 10초 증가
            if (analog_data[3] >= 200) and (buzzer_time_lock == 0):
                buzzer_time += 10
                buzzer_time_lock = 1
                
            ## 일산화탄소 감지시 부저 타임 10초 증가
            if (analog_data[4] >= 200) and (buzzer_time_lock == 0):
                buzzer_time += 10
                buzzer_time_lock = 1
            
            ## 버튼 감지시에 부저 타임 10초 증가
            if (btn_pressed == 1) and (buzzer_time_lock == 0):
                buzzer_time += 10
                buzzer_time_lock = 1
                
            ## 부저 타임 1이상시에 buzzer on 및 buzzer time 1초 감소
            if buzzer_time >= 1:
                gpio.output(2,gpio.HIGH) ##buzzer ON
                buzzer_time -= 1
            ## 그외에는 부저 OFF 및 buzzer_time_lock 활성화
            else:
                gpio.output(2,gpio.LOW) ##buzzer OFF
                buzzer_time_lock = 0
            
            btn_pressed=0
            print('부저타임',buzzer_time)
            
            
            
            await asyncio.sleep(1)
            
            
            
    except KeyboardInterrupt:
        print('Interrupted')
        GPIO.cleanup()
        sio.disconnect()


async def run():
    await asyncio.gather(main(), monitor_button())

# asyncio 루프 시작
asyncio.run(run())