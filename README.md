# ts-timer

## Get up and running
### Install nvm
https://github.com/nvm-sh/nvm#installing-and-updating

for example 

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

or

`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

And then make sure that this is in your bash profile or whatever shell script profile you have

`export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm`

### Install node with nvm
for example

`nvm install 12`

### Install the dependancies from npm
`npm install`

### Start it up
`npm start`

Open [localhost:5000](http://localhost:5000/) in your favorite web browswer

