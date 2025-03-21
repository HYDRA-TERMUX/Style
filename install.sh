#!/bin/bash
#Created by : HYDRA TERMUX
#GitHUB     : HYDRA-TERMUX
#Website    : hydratermux.blogspot.com

source ./logo.sh
echo ""
# Installing Packages
pkg update && pkg upgrade -y
pkg install unzip -y
pkg install nano -y
pkg install python -y
pkg install ruby -y
gem install lolcat
echo ""
clear

#Installing Files

source ./logo.sh 
echo ""
unzip corefiles
cd corefiles
mv FIX style
chmod +x style
mv style /$HOME/Style
mv style.sh /$HOME/Style
mv style.sh .style.sh
mv style /$HOME/cd ../usr/bin
echo ""
clear
source ./logo.sh
Created By HYDER TERMUX

Type STYLE Anywhere To Run

