import requests

#This file contains additional functions used to communicate with the API

def makeJSON(temperature_array):
    JSONOutput = {'cpu':temperature_array[0], 'gpu':temperature_array[1]}
    return JSONOutput
  
  
#Source Referenced: https://www.w3schools.com/python/ref_requests_post.asp
def sendDataToServer(JSONInput):
    #Try to connect to the server, send the data and return a reply
    try: 
        url = 'http://[IP_ADDRESS]:3000/api/post'
        myobj = JSONInput
        x = requests.post(url, data = JSONInput)
        return x
    #If this fails, it's likely a bad connection
    except:
        print("ERROR: SERVER CONNECTION IS BAD -> Did you replace the IP?")
        return None
        
