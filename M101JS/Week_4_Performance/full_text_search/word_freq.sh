#!/bin/bash

input=$1

IFS=$'\n'
# for keyword files...
if [ -e "$input" ]; then
    cat "$input" | sed 's/ /\n/g' >> tmp
    for word in $(cat "$input" | sed 's/ /\n/g' | sort | uniq); do
        count=$(grep -c "^$word\$" tmp)
        echo -e "$count\t$word" >> tmp_o
    done
    cat tmp_o | sort -hr
    rm tmp tmp_o
fi