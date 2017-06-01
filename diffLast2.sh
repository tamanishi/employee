#!/bin/sh
find ./result -type f | sort -r | head -2 | sort | xargs -t icdiff

