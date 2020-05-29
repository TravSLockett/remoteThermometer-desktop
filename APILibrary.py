
#This file contains additional functions used to communicate with the API

def makeJSON(temperature_array):
    JSONOutput = '{"CPU":' + str(temperature_array[0])
    if temperature_array[1] != -100:
        JSONOutput += ',"GPU":'+ str(temperature_array[1])
    JSONOutput += '}'
    return JSONOutput