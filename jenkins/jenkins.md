Download Jenkins
- https://www.jenkins.io/downloads
```Thank you for downloading Windows Stable installer 
Download hasn't started? Click this link

Changing boot configuration 
By default, your Jenkins runs at https://localhost:8080/. This can be changed by editing jenkins.xml , which is located in your installation directory. This file is also the place to change other boot configuration parameters, such as JVM options, HTTPS setup, etc.

Starting/stopping the service 
Jenkins is installed as a Windows service, and it is configured to start automatically upon boot. To start/stop them manually, use the service manager from the control panel, or the sc command line tool.

Inheriting your existing Jenkins installation 
If you'd like your new installation to take over your existing Jenkins data, copy your old data directory into the new JENKINS_HOME directory.

See Also 
Running Jenkins behind Internet Information Server (IIS)
Running Jenkins behind nginx
Running Jenkins behind Apache

- Note: Download Generic Java Package (.war) SHA-256:dc9d532e54d4b7eb7d78edcd3217876dd4811b49d1a3b66e599ad4a642d57193 not msi 
```
- Open terminal and go to path where jenkins.war is downloaded and enter ```java -jar jenkins.war -httpPort=9090```. We are asking java to open a jar called jenkins.war on port 9090, by default jenkins runs on 8080. We get some logs and it will start.
- Now we can give localhost:8080 and login with password and username


```You can check ports on Windows using the Command Prompt (netstat command) or PowerShell (Test-NetConnection or Get-NetTCPConnection cmdlets). The most common method is using netstat. 
Method 1: Using Command Prompt (netstat)
This method lists all active connections and listening ports, and can identify which process is using a specific port. 
FileCloud
FileCloud
Open Command Prompt as an administrator:
Press the Windows key and type cmd.
Right-click on Command Prompt in the search results and select Run as administrator.
View all active ports:
Type the following command and press Enter:
cmd
```netstat -ano```
The output will display the protocol (Proto), Local Address (which includes the IP address and port number), Foreign Address, State (e.g., LISTENING, ESTABLISHED), and the PID (Process ID).
Check a specific port:
To filter the results for a specific port (e.g., port 8080), use the findstr command:
cmd
```netstat -ano | findstr :8080```
The findstr command acts like grep on Linux/Mac and filters the netstat output.
If you see output with the state LISTENING next to the port number, it means the port is in use.
Identify the application using the port (using PID):
Note the PID from the netstat output.
Open Task Manager (press Ctrl + Shift + Esc).
Go to the Details tab. If you don't see a PID column, right-click on the column headers and select PID.
Sort by the PID column and find the matching number to identify the process or application using the port. 
```

```
Using Command Prompt (CMD)
If you prefer using the command line, there are two primary methods depending on how Jenkins was installed. Run the Command Prompt as an administrator for best results. 
Stack Overflow
Stack Overflow
 +3
Method 1: Using net commands (for a service installation)
If Jenkins was installed as a Windows service (the default when using the MSI installer), you can use net commands: 
Stack Overflow
Stack Overflow
Check status (implicitly): The net start command will list all running services. You can pipe this through findstr.
powershell
net start | findstr "Jenkins"
If "Jenkins" is listed, it's running.
Explicit Status (using sc qc): For a more specific status check, use the sc command:
powershell
sc qc Jenkins
This will query the service configuration. The STATE line in the output indicates if it's running.
Start the service:
powershell
net start Jenkins
Stop the service:
powershell
net stop Jenkins
 
Method 2: Using jenkins.exe commands (from installation directory)
If Jenkins was run from its executable, navigate to the installation directory (by default, C:\Program Files\Jenkins\ or C:\Program Files (x86)\Jenkins\) to use the specific commands: 
Stack Overflow
Stack Overflow
 +1
Navigate to directory:
powershell
cd "C:\Program Files\Jenkins"
Check status (implicitly): You can check the log files (e.g., jenkins.out.log or jenkins.err.log) located in the installation directory for activity and errors.
Start Jenkins:
powershell
.\jenkins.exe start
Stop Jenkins:
powershell
.\jenkins.exe stop
 
Jenkins
Jenkins
 +2

```

- JENKIS JOB CONFIGURATION
    - New item -> Enter a name -> freestyleproject
    - Project Url -> we can give git url or advanced -> custom workspace
    - Add build steps 
      - windows -> window batch command -> npm run test 
      - click on build now and see jenkins started running tests 
    - Paramterize the job to run specific commands. -> Select This project is parameterized and choice parameter
      - Name it as script and give all choices
      - go windows batch commamnd and "%Script%" -> "%parameter%" , execute shell command "$Script" ->"$parmeter"
      - Now you see build now has become build with parameters and you can select choices and build
      - Now to see report just go to VScode and usual steps