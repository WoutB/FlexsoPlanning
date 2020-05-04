# Flexso Project Planning tool

🔥 A UI5 application built in the SAP Web IDE. (note: at the time of development, the Git integration sucked)

## Business case

- A company needed a simple platform to: 
  - create/edit projects & schedule them
  - assign members & roles 
  - track team members skills and evaluate them
  - show some fancy graphs 📈
  - export csv/pdf

  Extra:
    - add/edit evaluation criteria
    - add project goals

## Getting started

> This projects backend is hosted on the Erasmushogeschools SAP Server. If you're lucky to have access, make sure to check it out! 

### Mockups
To get things started, we build out our visiuals inside the [Build.me](build.me) UI5 builder. It was a fairly new tool at the time, so we (= an awesome team of 3 focused, model students 😬) lost our progress from time to time.

### Data
Data modeling was my cup of tea (eventhough I've sworn by coffee). After creating a comprehensive data structure on a piece of paper, we started create tables non-stop & filling them up with some mockdata.That's where the party just got started. ✨

To obtain your SAP data, you needed CDS (Corde Data Services) files. A CDS file is basically an ABAP extension to (re)define your data model. The next step was to pour these into an OData service. 

### Bridging the gap
The biggest problem in this setup was the 💩-VPN-protected-server. The SAP gateway for RFC was only available through VPN. 👉 Cloud Connector to the resque. This setup was pretty hard and buggy. But afterwards, everything worked like a charm.

### The UI5 app 🌀
SAP UI5 is nothing like your normal Frameworks, at least not like the ones third years students had heard about.. It was pretty hard to go from [shopping card demo](https://sapui5.hana.ondemand.com/#/demoapps) to a fully functional project planning tool.  *(2018) Note to self: do not thrust the Git versioning in the Web IDE*

### The verdict
In the end, our team was apparantly the only team who succeeded in implementing all the requirements and even the extra features. This was a really interesting project, since we were totally left on our own & we got to choose our own way of working without anyone creeping over our shoulders. We also had the knowledge of two great Flexso consultings to help in the process.