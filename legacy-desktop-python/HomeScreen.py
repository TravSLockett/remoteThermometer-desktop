from Temperature import temperatureChecker
from APILibrary import *
import tkinter as tk
import pygubu
import webbrowser

class HomeGUI:
 
    #Load in the Temperature Checker class and make the GUI Visible
    def __init__(self, master):
        self.master = master
        self.checker = temperatureChecker()
        temperature_infos = self.checker.begin()
        if temperature_infos == None:
            print("Error loading, are you running as admin?")
            exit()
        self.builder = builder = pygubu.Builder()
        builder.add_from_file('HomeGUI.ui')
        self.mainWindow = builder.get_object('mainWindow',master)
        builder.connect_callbacks(self)
        
    #When refresh is presssed, get the newest temperatures and display them
    def RefreshDisplay(self):
        temperature_array = self.checker.getTemps()
        self.textField = self.builder.get_object('outputBox')
        self.textField.delete(1.0, tk.END)
        TemperatureOutputs = f"CPU Temperature: {temperature_array[0]} \nGPU Temperature: {temperature_array[1]}"
        self.textField.insert(tk.END, TemperatureOutputs)
        
        self.textField.insert(tk.END, "\nData Sent To Server...\n")
        #Prepare the JSON
        JSONOutput = makeJSON(temperature_array)
        #Contact the server
        reply = sendDataToServer(JSONOutput)
        if (reply == None):
            self.textField.insert(tk.END, "Server Error (See Console)")
        else:
            self.textField.insert(tk.END, "Server Reply:\n")
            self.textField.insert(tk.END, reply.text)
        
        
    #Close temperature checker and quit
    def QuitApp(self):
        self.checker.close()
        self.master.quit()