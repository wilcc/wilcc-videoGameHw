const { uuid } = require('uuidv4')


let games = [
    { id: `1`, name: 'World of Warcraft', description: 'best MMORPG ever existed', yearReleased: '2004',playtime:'10+ years' },
    { id: `${uuid()}`, name: 'Age of Empire', description: 'classic RTS game', yearReleased: '1997',playtime:'20+ years' },

]
module.exports= games