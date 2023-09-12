/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        colors:{
   
            orange:{
              '1':'#fc4801',
              '2':'#fe6905',
              '3':'#f88807'
            },
          gray:{
            '1':' #1c1c28',
            '2':'#28293d',
            '3':'#32334d'
          }
         
           },
           fontFamily: {

            ybakh: ['ybakh'],
            ybakhbold:['ybakhbold'],
            ybakhfat:['ybakhfat'],
            vazir:['vazir']
      
          },
      },
    },
    plugins: [],
  }