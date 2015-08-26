# SCA Shared Service

## What is this?

Most SCA components share some sub-components - like menus for UI, and media / static contents. In a spirit of microservice,
we should not turn this into some sort of a central service that oversees everyone. Instead, treat this as a *public* service
that other components can use *if* they want to.

## Specifications

Fow now, I will use /api/config/config.js to store most configurations, but in the future we should pull data from etcd.
or maybe allow other components to pub/sub information that no particular service should own.

/api provides various json content (like menu items that user has access to)
/ui provides various html snippets that each components can ng-include to render the data from /api

## TODO


