# remoteThermometer-desktop

### How to test (Only works on Windows):

* Open PowerShell as Administrator
* If this is your first time, do the following:
  * Run "pip install wmi" in PowerShell (Used to read temperatures)
  * Run "pip install pygubu" in PowerShell (Used for GUI - may cause compile errors without it)
  * Run "pip install requests" in PowerShell (Used to communicate with the server)
  * Optional: Set OpenHardwareMonitor to "launch minimized" (Hides OpenHardwareMonitor in the background during execution)
* Navigate to the project folder and enter "python Main.py"
* Remember to replace "[IP_ADDRESS]" (in APILibrary, line 12) with the IP of the server before running
