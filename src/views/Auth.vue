<template>
    <v-container>
        <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/spreadsheets&response_type=token&client_id=862889500118-1ujt3lr6374s1eq80s6jpjfdffu84eqa.apps.googleusercontent.com&redirect_uri=http://localhost:3500/auth" class="btn">Auth</a>
    </v-container>
</template>
<script>
export default {
    created() {
        const fragmentString = this.$route.hash.substring(1)
        // const params = {}
        // const regex = /([^&=]+)=([^&]*)/g, m
        // while (m = regex.exec(fragmentString)) {
        //     params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
        // }
        if(fragmentString.length > 0) {
            const access_token = fragmentString.split("=")[1]
            console.log(access_token.split("&")[0])
            localStorage.setItem('access_token', access_token.split("&")[0])
        }
        console.log(localStorage.getItem('access_token'))
    }
}
</script>