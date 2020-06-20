from APILibrary import *
import tkinter as tk
import pygubu
import webbrowser

class LoginGUI:

    #Load in the Temperature Checker class and make the GUI Visible
    def __init__(self, master):
        self.master = master
        self.builder = builder = pygubu.Builder()
        builder.add_from_file('LoginGUI.ui')
        self.mainWindow = builder.get_object('loginWindow',master)
        builder.connect_callbacks(self)
        
    #When refresh is presssed, get the newest temperatures and display them
    def Login(self):
       self.CloseDisplay()
    
    def Register(self):
       self.CloseDisplay()
        
    def CloseDisplay(self):
       self.master.quit()
       
   #Close temperature checker and quit
    def QuitApp(self):
        self.master.quit()
        