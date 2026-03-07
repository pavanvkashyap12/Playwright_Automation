# AZURE CICD PIPELINES

### Microsoft Azure is a comprehensive public cloud computing platform providing infrastructure, services, and databases (IaaS/PaaS). Azure DevOps is a set of tools focused on the software development lifecycle, including CI/CD, project management (Boards), and version control (Repos). Azure hosts services, while Azure DevOps manages the software delivery process. 

- Upload repo to github/azure devops
- Azure Devops is like Jenkins and Github together
- Azure is like AWS

- Now go to azure devops which is same as azure
- create a resource -> azure devops -> my azure devops organization
- first time it will ask to create your own organization
- once done you see organization
- go to your organization
- create a project -> give some name like TestSpace
- In TestSpace project we can push repo , create pipelines just like jenkins, environments to deploy in prod,QA env , Test plans like track testcases etc, Artifacts to store jars,npm packages, Board like Jira board to create sprint
- Overall it is like a project managment tool
- Now pusing to azure repo 
``` git init
    git remote add origin azureRepo link
    git add .
    git commit -m"commit message"
    git push -u origin -all
```
- Now go back to repos you can see all code
- Now go to pipelines and to create pipeline we have to use .yml file
- we need to have .yml file in project level then only azure can read it and create a pipeline
- now go to pipelines
- where is your code ? Azure Git Repo -> Select a repo
- configure your pipeline -> select existing azure pipelines YAML file -> select branch -> select path -> continue
- here there is variable PLAYWRIGHT SERVICE URL in pipeline for azure cloud we explicitly gave in terminal but here for pipelines we have to go to variables in review your pipeline yaml -> give name and value - save -> run 
- Now you can see build started and permit it 
- once done we can see report in playwright.microsoft.com how this works bcoz we have given service_url
- once you commit automatically starts running
