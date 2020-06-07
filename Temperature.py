#Temperature Checker Class

#Source: https://stackoverflow.com/questions/3262603/accessing-cpu-temperature-in-python
#Source: https://stackoverflow.com/questions/4645909/python-how-to-start-a-process-with-administrator-permissions
#Source: https://stackoverflow.com/questions/6278847/is-it-possible-to-kill-a-process-on-windows-from-within-python
#Source: https://stackoverflow.com/questions/2963263/how-can-i-create-a-simple-message-box-in-python
#Source: https://openhardwaremonitor.org/
#Source: https://github.com/brentvollebregt/auto-py-to-exe

#Import Libraries
import wmi
import time
import os
import ctypes

#This class allows a user to check the temperature
class temperatureChecker:
    
    #Stores the WMI and OpenHardwareMonitor data
    temperature_infos = None
    w = None
    debugMode = False
    
    def debug(self, value):
        if (value == True):
            self.debugMode = True
        else:
            self.debugMode = False
    
    #Run this first
    def begin(self):
        try:
            #Load OpenHardwareMonitor. This finds system info such as the temperatures
            if self.debugMode == True:
                print("Initializing...");
                print("Launching OpenHardwareMonitor...");
            os.startfile(os.path.join(os.getcwd(), './OpenHardwareMonitor/OpenHardwareMonitor.exe'))
            #Give it time to start. We might clean this up later as it can be a bit buggy, particularly on slower machince
            time.sleep(5)
            #Use WMI to connect to OpenHardwareMonitor
            if self.debugMode == True:
                print("Pulling Temperature...");
            self.w = wmi.WMI(namespace="root\OpenHardwareMonitor")
            self.temperature_infos = self.w.Sensor()
            return self.temperature_infos
        except:
            return None

    #Gets the current temperatures of CPU and GPU; returns -100 if values do not exist
    def getTemps(self):
        self.temperature_infos = self.w.Sensor()
        #These variables will store the temperatures. I made sure they initialize as floats
        cpuTemp = float(0)
        gpuTemp = float(0)

        #For each temperature that can be read, list them and save the relevant ones
        for sensor in self.temperature_infos:
            if sensor.SensorType==u'Temperature':
                if self.debugMode == True:
                    print(sensor.Name)
                    print(sensor.Value)
                if sensor.Name == "CPU Package":
                    cpuTemp = sensor.Value
                if sensor.Name == "GPU Core":
                    gpuTemp = sensor.Value

        temperature_array = [cpuTemp, gpuTemp]
        return temperature_array
       
    #Display the temperatures, mostly here for debugModeging
    def displayTemps(self):
        temperature_array = self.getTemps()
        cpuTemp = temperature_array[0]
        gpuTemp = temperature_array[1]
        #Tell the user CPU and GPU temperatures if they exist
        if cpuTemp != 0:
            ctypes.windll.user32.MessageBoxW(0, f"Your CPU temperature is {cpuTemp}C", "CPU", 1)
        if gpuTemp != 0:
            ctypes.windll.user32.MessageBoxW(0, f"Your GPU temperature is {gpuTemp}C", "GPU", 1)
        return temperature_array

    def close(self):
        #Close OpenHardwareMonitor. If we don't, multiple instances may run next time which can cause problems
        if self.debugMode == True:
            print("Closing OpenHardwareMonitor...");
        os.system("taskkill /f /im  OpenHardwareMonitor.exe")


