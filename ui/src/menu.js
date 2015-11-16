(function() {
    'use strict';
    var sca = angular.module('sca-shared.menu', [
        //'toaster',
    ]);

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
                        if(~scope.common.indexOf('user')) return true;
                        return false;
                    }
                },            
            ] 
        },

        {
            id: "user",
            //icon: "<img src='http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=19'>",
            _label: {default: "Me", profile: "fullname"},
            props: { right: true },
            show: function(scope) {
                if(~scope.common.indexOf('user')) return true;
                return false;
            },
            submenu: [
                {
                    id: "settings",
                    label: "Settings",
                    url: "/profile",
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
                if(~scope.common.indexOf('user')) return false;
                return true;
            },
            props: { right: true }
        },
        {
            id: "signup",
            label: "Sign Up",
            url: "/auth/#/signup",
            show: function(scope) {
                if(~scope.common.indexOf('user')) return false;
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
                if(~scope.common.indexOf('user')) return true;
                return false;
            }
        },
        {
            id: "account",
            label: "Account",
            url: "/auth/#/settings",
            show: function(scope) {
                if(~scope.common.indexOf('user')) return true;
                return false;
            }
        },
    ]);

})();
