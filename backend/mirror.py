import socket

from RPi import GPIO
import time
from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS

from helpers import dht11
from helpers.Database import Database
from helpers.ds1820 import Ds1820

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
blauw = 25
rood = 24
groen = 23
pir = 5
GPIO.setup(blauw, GPIO.OUT)
GPIO.setup(rood, GPIO.OUT)
GPIO.setup(groen, GPIO.OUT)
GPIO.setup(pir, GPIO.IN)
roodpwm = GPIO.PWM(rood, 100)
roodpwm.start(0)
groenpwm = GPIO.PWM(groen, 100)
groenpwm.start(0)
blauwpwm = GPIO.PWM(blauw, 100)
blauwpwm.start(0)
vorigeLucht = 50

sensor = '/sys/bus/w1/devices/28-011850f04eff/w1_slave'
temp = Ds1820(sensor)

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

conn = Database(app, 'gilles', 'gilles', 'Projectdb')


@socketio.on("beweging")
def connecting():
    if GPIO.input(pir) == True:
        print("Refreshed!")
        socketio.emit("temperatuur", {'value': temp.temperature()})
        socketio.emit("luchtvochtigheid", {'value': humidity()})
        socketio.emit("ip", {'value': get_ip_address()})
        print("Connection with client established")
        time.sleep(2)


def get_ip_address():
    ip_address = '';
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip_address = s.getsockname()[0]
    s.close()
    return (ip_address)


def humidity():
    global vorigeLucht
    instance = dht11.DHT11(pin=22)
    result = instance.read()
    if result.is_valid():
        vorigeLucht = result.humidity
        return (result.humidity)
    else:
        return vorigeLucht


def hex_to_rgb(hex):
    hex = hex.lstrip('#')
    hlen = len(hex)
    return tuple(int(hex[i:i + hlen // 3], 16) for i in range(0, hlen, hlen // 3))


@socketio.on("data")
def connecting():
    socketio.emit("temperatuur", {'value': temp.temperature()})
    socketio.emit("luchtvochtigheid", {'value': humidity()})
    socketio.emit("ip", {'value': get_ip_address()})
    print("Connection with client established")


@socketio.on('change')
def veranderKleur(waarde):
    print(waarde)
    value = hex_to_rgb(waarde)
    print(value[0] / 255 * 100)
    print(value[1] / 255 * 100)
    print(value[2] / 255 * 100)
    roodpwm.ChangeDutyCycle(value[0] / 255 * 100)
    groenpwm.ChangeDutyCycle(value[1] / 255 * 100)
    blauwpwm.ChangeDutyCycle(value[2] / 255 * 100)


@socketio.on('off')
def veranderKleur():
    roodpwm.ChangeDutyCycle(0)
    groenpwm.ChangeDutyCycle(0)
    blauwpwm.ChangeDutyCycle(0)


@socketio.on('storeTemp')
def toggle(data):
    conn.set_data('insert into Metingen(sensorID, waarde) VALUES (1,%s)', [data["value"]])


@socketio.on('storeLucht')
def toggle(data):
    conn.set_data('insert into Metingen(sensorID, waarde) VALUES (2,%s)', [data["value"]])


@app.route('/metingen', methods=['GET'])
def metingen():
    return jsonify(
        conn.get_data(
            'select distinct(mid(datumTijd, 1,10)) ,day(datumTijd) as "Dag",month(datumTijd) as "Maand",Year(datumTijd) as "Jaar", dayname(datumTijd) as "DagNaam" from Metingen order by datumTijd desc limit 7'))


@app.route('/metingen/<datum>')
def geef_meting_datum(datum):
    print(datum)
    begindatum = datum + ' 00:00:00'
    einddatum = datum + ' 23:59:59'
    return jsonify(
        conn.get_data("SELECT * FROM Projectdb.Metingen WHERE datumTijd BETWEEN %s AND %s",
                      (begindatum, einddatum)))


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)

roodpwm.stop()
groenpwm.stop()
blauwpwm.stop()
GPIO.cleanup()
