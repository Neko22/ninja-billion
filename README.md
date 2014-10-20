Ninja Billion
=================
Author: Matt Hall
Version: 0.0.1
Status: Beta
License: MIT

Reports on internet traffic to and from a Billion BiPAC 7800DXL Router.
Other Billion router models may also work, but have not been tested.


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


### Notes
- Currently hard coded the router IP address to 192.168.0.1, but can change it in the options. 
  For the next version I plan to get it to try and identify the router IP address automatically.
- Might look into what other things the router can do.

### Change History
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
