#!/bin/bash
main() {
    if [ "$NODE_ENV" == "development" ]
    then
        pm2_dev
    else
        pm2_runtime
    fi
}

pm2_dev() {
    echo "Launching PM2 Dev Runtime"
    pm2-dev ecosystem.json
}
pm2_runtime() {
    echo "Launching PM2 Runtime"
    pm2-runtime ecosystem.json --only app
}

trap control_c SIGINT SIGTERM SIGHUP

main

exit
