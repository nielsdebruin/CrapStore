# CrapStore
A webshop made to be exploited.

## Contents

1. **Introduction**
2. **Installation**
3. **End-to-End Tests**
4. **The Team**

*For a list of exploits, see the manual (`manual/manual.tex`)*

## Introduction
Have you ever tried to hack into an application that you have built? If you haven't yet, or if you just like breaking things, CrapStore is the tool for you.

### What is CrapStore?
In a nutshell, CrapStore is a modern version of BadStore, a penetration testing practice tool for web developers. In other words, it is a webshop full of security flaws and vulnerabilities, waiting for you to find and exploit them. In contrast to the original BadStore platform, CrapStore is built on top of the (more up-to-date) node.js JavaScript server platform.

We are not affiliated with the BadStore project in any way, but the list of exploits and the contents of this webshop were primarily inspired by the BadStore application.

### The Purpose of CrapStore
By exploring the various vulnerabilities modern web systems have to offer, you look at web applications from the point of view of a hacker - somebody who wants to penetrate a system. This can be a valuable insight, because instead of trying to make things work, you are trying to break the application on purpose. It is our hope that you can learn from this experience and, as a result, can increase the security of your own site.

The vulnerabilities you can find in CrapStore are not purely fictional - they are (unfortunately) far more common than you might think. This is why CrapStore can help make you aware of what can go wrong, so that you can fill up the loopholes in time, before someone else sneaks through them.

### Disclaimer
To be clear: this is *not* a safe web application. Don't enter sensitive information! And, perhaps more importantly, don't expect us to send you a real iPad.

Perform these penetration tests on websites only if you have the written consent of their owners to do so, and even then perform them in a secured offline environment. Try these attacks at your own risk, we assume no responsibility at all for any and all possible damage caused.

## Installation

1. To setup the MySQL database instance, run `schema.sql` and `sample.sql` (as well as any time you want a fresh install of the database). 
2. All required NPM packages are listed in the `package.json` file. That just leaves you to run `npm install`, which installs all necessary packages. 
3. Then, `bower install` will download and insert the necessary dependencies into the project (such as jQuery or Bootstrap).
4. This is a grunt-based project, thus executing the `serve` task of grunt (by executing `grunt serve`) starts the server on <http://localhost:1337>.

*Note: depending on your NPM setup, you might need to perform `npm install -g bower` and `npm install -g grunt` before being able to execute the bower and grunt commands.*

## End-to-End Tests
This application includes protractor tests, that assert its ability to model web vulnerabilities correctly. In order to run these tests, you'll need to do the following:

1. Follow the installation steps (make sure that you have a clean DB setup, so without any added products or guestbook entries)
2. Install the protractor framework globally with the command `npm install -g protractor`
3. Run the tests with `grunt test`

## The Team
Developed by Georgios Andreadis (`gandreadis`) and Niels de Bruin (`ndebruin`). Feature requests and bugs can be filed in the Github Issues system.
