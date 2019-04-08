from firebase import firebase
import time
import random

current_milli_time = lambda: int(round(time.time() * 1000))
firebase = firebase.FirebaseApplication('https://adaforever-bc97c.firebaseio.com/', None)
now = current_milli_time()
random.seed(now)


while True:
    now = current_milli_time()
    rand = random.random()*50
    data = {'value': rand, 'date': now}
    firebase.post('/temperature', data)

    now = current_milli_time()
    rand = random.random()*100
    data = {'value': rand, 'date': now}
    firebase.post('/humidity', data)

    now = current_milli_time()
    rand = random.random()*10
    data = {'value': rand, 'date': now}
    firebase.post('/pressure', data)

    time.sleep(1)