Ninja Billion
=================
Author: Matt Hall
Version: 0.0.2
Status: Beta
License: MIT

Reports on internet traffic to and from a Billion BiPAC Router.

Currently supported Routers:

 - 7800N (Thanks @jcarlsonjones)
 - 7800DXL
 
Other Billion router models may also work, but have not been tested.
If you do find one works, please let me know so I can add it to the list.


### Installation
#### Step 1 - Fetch the driver
```
cd PATH_TO_NINJA_CLIENT/drivers (e.g. /opt/ninjablocks/block-client/drivers)
git clone https://github.com/Neko22/ninja-billion
cd ninja-billion
npm install
```


#### Step 2 - Restart the Ninja Block process
```
sudo service ninjablock restart
```


### Change History
##### 0.0.2
- ADD: Added support for Billion 7800N Router.
- ADD: Added support to enter a custom port number.
- ADD: Altered driver to fetch byte count by scraping page rather than accessing shell script, in order to support a greater number of devices and support future features. 
- FIX: Fixed bug where byte count was not correct.

##### 0.0.1
- First Beta Release.


### License
Copyright (c) 2014 Matt Hall

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
