#!/usr/local/bin/ruby

# Kill the server if it is running
`ps aux | grep "[j]ava server.Server" | tr -s ' ' | cut -d' ' -f 2 | xargs kill`

# Wait a bit
sleep 1

# Restart the server
`tmux send -t 307Server.0 "find . -name *.class | xargs rm ; git pull ; javac server/Server.java ; java server.Server" ENTER`

# Wait a bit
sleep 10

puts "Server restarted"
