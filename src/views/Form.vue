<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="8">
                <h1 class="text-center">Form Pendaftaran</h1>
                <v-form ref="form" >
                    <v-text-field v-model="registers.nim" label="NIM" required></v-text-field>
                    <v-text-field v-model="registers.name" label="Name" required></v-text-field>
                    <v-select v-model="registers.gender" label="Gender" :items="genders" required></v-select>
                    <v-text-field v-model="registers.email" label="Email" required></v-text-field>
                    <v-text-field v-model="registers.phone" label="Phone" required></v-text-field>
                    <v-text-field v-model="registers.telegram_id" label="Telegram ID"></v-text-field>
                    <div class="text-center">
                        <v-btn color="success" class="mr-4" @click="register">Join</v-btn>
                        <v-btn color="warning" class="mr-4">Reset</v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios'
// import credentials from '../../credentials.json'
export default {
    data: () => ({
        registers: {
            nim: "",
            name: "",
            gender: "",
            email: "",
            phone: "",
            telegram_id: ""
        },
        genders: ["Laki-laki", "Perempuan"]
    }),
    created() {
        console.log(new Date().getTime())
        console.log(localStorage.getItem('access_token'))
        console.log(process.env.VUE_APP_SHEET_NAME)
        axios.get('https://sheets.googleapis.com/v4/spreadsheets/'+process.env.VUE_APP_SHEET_NAME+'/values/Sheet1?key=AIzaSyDKdKFuUD4h0Ctt-FkBx1LOV0JiBymmCAg')
        .then((res) => {
            console.log(res.data.values)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    methods: {
        register() {
            console.log(this.registers)
            this.$store.commit('add', this.registers)
            console.log(localStorage.getItem('access_token'))
            const data = {
                values: [
                    [
                        this.$uuid.v1(),
                        this.registers.nim,
                        this.registers.name,
                        this.registers.gender,
                        this.registers.email,
                        this.registers.phone,
                        this.registers.telegram_id,
                    ]
                ]
            }
            axios.post('https://sheets.googleapis.com/v4/spreadsheets/'+process.env.SHEET_NAME+'/values/Sheet1:append?valueInputOption=RAW',  data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            }).then((response) => {
                console.log(response)
                alert('Registered!')
                this.registers = {
                    nim: "",
                    name: "",
                    gender: "",
                    email: "",
                    phone: "",
                    telegram_id: ""
                }                
            }).catch((err) => {
                console.log(err)
            })
            console.log(this.$store.getters.registers)
        }
    }
}
</script>