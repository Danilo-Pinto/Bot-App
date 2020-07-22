var adds = []

module.exports = {
    setAdds(user,title,price,ordem_id){
        return adds.push({
            ordem_id,
            title,
            price,
            user
        });
    },

    getAdds(user){
        return adds.filter(
            e => e.user == user
        )
    },
    deleteAdds(user){
        adds = adds.filter(
            e => e.user != user
        )
    },
    validateUniqueAdds(user,title,code){
        return adds.filter(
            e => e.user == user
        ).find(e => (e.title == title) && (e.ordem_id == code) )
    },
}