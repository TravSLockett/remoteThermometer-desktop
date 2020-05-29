#Prereq:
#pip install wmi
#pip intall pygubu
#Optional: Set OpenHardwareMonitor to "launch minimized"
#Edit the GUI with pygubu-designer
#Compile this with auto-py-to-exe

#Source: https://www.youtube.com/watch?v=wuzV9P8geDg (Pygubu)
#Source: https://www.javatpoint.com/python-tkinter-text
#Source: https://github.com/alejandroautalan/pygubu

#Import libraries
from Temperature import temperatureChecker
from APILibrary import *
import tkinter as tk
import pygubu
import webbrowser

class Application:
 
    #Load in the Temperature Checker class and make the GUI Visible
    def __init__(self, master):
        self.master = master
        self.checker = temperatureChecker()
        temperature_infos = self.checker.begin()
        if temperature_infos == None:
            print("Error loading, are you running as admin?")
            exit()
        self.builder = builder = pygubu.Builder()
        builder.add_from_file('GUISample.ui')
        self.mainWindow = builder.get_object('mainWindow',master)
        builder.connect_callbacks(self)
        
    #When refresh is presssed, get the newest temperatures and display them
    def RefreshDisplay(self):
        temperature_array = self.checker.getTemps()
        self.textField = self.builder.get_object('outputBox')
        self.textField.delete(1.0, tk.END)
        TemperatureOutputs = f"CPU Temperature: \n{temperature_array[0]} \n\nGPU Temperature: \n{temperature_array[1]}"
        self.textField.insert(tk.END, TemperatureOutputs)
        
    #Close temperature checker and quit
    def QuitApp(self):
        self.checker.close()
        self.master.quit()

"""
#Launch the GUI
root = tk.Tk()
app = Application(root)
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
print(JSONOutput)

#Uncomment the lines below to test the API
#site = 'http://IPADDRESS:PORT/' + JSONOutput
#webbrowser.open(site, new = 2)

#Always run this when you're finished with the class, it ends the extra process
checker.close()



