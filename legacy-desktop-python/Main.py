#Prereq:
#pip install wmi
#pip intall pygubu
#Optional: Set OpenHardwareMonitor to "launch minimized"
#Edit the GUI with pygubu-designer
#Compile this with auto-py-to-exe

#Source: https://www.youtube.com/watch?v=wuzV9P8geDg (Pygubu)
#Source: https://www.javatpoint.com/python-tkinter-text
#Source: https://github.com/alejandroautalan/pygubu

#-----------------------------------------------

#Import libraries

#Data and communication
from Temperature import temperatureChecker
from APILibrary import *
import webbrowser

#GUI Screens
from HomeScreen import *
from LoginScreen import *

#Underlying GUI libraries
import tkinter as tk
import pygubu


#-----------------------------------------------

#Begin App

#Launch the LoginScreen
loginroot = tk.Tk()
app = LoginGUI(loginroot)
loginroot.mainloop()
loginroot.destroy()

#Launch the HomeScreen
root = tk.Tk()
app = HomeGUI(root)
root.mainloop()


"""
#Load in the temperature class from Temperature.py
checker = temperatureChecker()
#Set Debug to true, shows a more verbose output for testing, we'll turn this off later
checker.debug(True)
temperature_infos = checker.begin()
#If a problem launching is detected, display an error and quit
if temperature_infos == None:
    print("Error loading, are you running as admin?")
    exit()
#Get the temperature, commented out for now
#temperature_array = checker.getTemps()
#This does the same as getTemps() but has popups to show the CPU and GPU temperatures
temperature_array = checker.displayTemps()

#Parse the output into json
print("Building JSON")
#Turns the array into JSON, from APILibrary
JSONOutput = makeJSON(temperature_array)
print("JSON is:")
print(JSONOutput)
print("Contacting the server:")
reply = sendDataToServer(JSONOutput)
print("The server's reply:")
print(reply.text)

#Always run this when you're finished with the class, it ends the extra process
checker.close()

"""

