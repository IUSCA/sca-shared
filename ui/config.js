(function() {
    'use strict';
    var sca = angular.module('sca-shared.menu', []);
    sca.constant('scaMenu', [
        {
            id: "meshconfig",
            label: "MeshConfig Admin",
            url: "/meshconfig"
        },
        {
            id: "sls",
            label: "WLCG sLS",
            url: "https://soichi7.ppa.iu.edu/sls/lookup/records"
        },
        {
            id: "dicom",
            label: "Dicom QC",
            url: "/dicom"
        },
        {
            id: "sca",
            //icon: "<img src='http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=19'>",
            label: "SCA",
            submenu: [
                /*
                {
                    id: "scaportal",
                    label: "Portal",
                    url: "/sca",
                    show: function(scope) {
                        if(~scope.sca.indexOf('user')) return true;
                        return false;
                    }
                },
                */
                {
                    id: "life",
                    label: "Life Demo",
                    url: "/life",
                    /*
                    show: function(scope) {
                        if(~scope.sca.indexOf('user')) return true;
                        return false;
                    }
                    */
                },
                {
                    id: "progress",
                    label: "Progress",
                    url: "/progress",
                },
                {
                    id: "imagex",
                    label: "ImageX",
                    url: "/imagex",
                },
                {
                    id: "websh",
                    label: "Websh",
                    url: "/websh",
                    show: function(scope) {
                        if(~scope.sca.indexOf('user')) return true;
                        return false;
                    }
                },            
                {
                    id: "imagex",
                    label: "ImageX",
                    url: "/imagex",
                },
            ] 
        },
        {
            id: "sciapt",
            //icon: "<img src='http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=19'>",
            label: "SciApt",
            submenu: [
                {
                    id: "mats",
                    label: "Compute-O-Mat",
                    url: "/mats",
                },
            ] 
        },


        {
            id: "user",
            //icon: "<img src='http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=19'>",
            _label: {default: "Me", profile: "fullname"},
            props: { right: true },
            show: function(scope) {
                if(~scope.sca.indexOf('user')) return true;
                return false;
            },
            submenu: [
                {
                    id: "settings",
                    label: "Settings",
                    url: "/profile",
                },
                {
                    id: "admin",
                    label: "Administration",
                    url: "/auth/#/admin/users",
                    show: function(scope) {
                        if(~scope.sca.indexOf('admin')) return true;
                        return false;
                    },
                },
                { separator: true },
                //{ header: true, label: "Random Header Here" },
                {
                    id: "signout",
                    label: "Sign Out",
                    url: "/auth/#/signout",
                },
            ] 
        },
        {
            id: "signin",
            label: "Sign In",
            url: "/auth",
            show: function(scope) {
                //negative logic needs to be careful not to throw exception if scope is missing
                if(scope.sca && ~scope.sca.indexOf('user')) return false;
                return true;
            },
            props: { right: true }
        },
        {
            id: "signup",
            label: "Sign Up",
            url: "/auth/#/signup",
            show: function(scope) {
                //negative logic needs to be careful not to throw exception if scope is missing
                if(scope.sca && ~scope.sca.indexOf('user')) return false;
                return true;
            },
            props: { right: true }
        },
    ]);

    sca.constant('scaSettingsMenu', [
        {
            id: "profile",
            label: "Profile",
            url: "/profile",
            show: function(scope) {
                if(~scope.sca.indexOf('user')) return true;
                return false;
            }
        },
        {
            id: "account",
            label: "Account",
            url: "/auth/#/settings/account",
            show: function(scope) {
                if(~scope.sca.indexOf('user')) return true;
                return false;
            }
        },
    ]);

    sca.constant('scaAdminMenu', [
        {
            id: "adminusers",
            label: "Users",
            url: "/auth/#/admin/users",
            show: function(scope) {
                if(~scope.sca.indexOf('admin')) return true;
                return false;
            }
        },
    ]);

})();
