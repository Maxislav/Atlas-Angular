#!/bin/bash
#echo "hello world"
value=`service mysql status`
echo "$value";
if [[ $value =~ process ]];
then
    echo "Ok"
else
   `service mysql start`
fi