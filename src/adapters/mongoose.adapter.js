const adapter = {
  async insert (type, data) {
    let generic = require(`../models/${type}`)
    let holder = new generic(data)
    holder.save((err) => {
      if (err) {
          console.log(err)
        return false
      } else {
        return true
      }
    })
  },
  async update (type, data, who) {
    let generic = require(`../models/${type}`)
    let holder = await generic.findOne(who)
    if (!holder) {
      return false
    }
    let query = await generic.findByIdAndUpdate({_id: holder.id}, data)
    if (query) {
      return true
    } else {
      return false
    }
  },

  async fetch (type, who) {
    let generic = require(`../models/${type}`)
    let holder = await generic.findOne(who)
    if (holder) {
      return holder
    } else {
      return false
    }
  },

  async fetchMany (type, who) {
    let generic = require(`../models/${type}`)
    let holder = await generic.find(who)
    if (holder) {
      return holder
    } else {
      return false
    }
  },

  async fetchAll (type) {
    let generic = require(`../models/${type}`)
    let holder = await generic.find()
    if (holder) {
      return holder
    } else {
      return false
    }
  },

  async del (type, _id) {
    let generic = require(`../models/${type}`)
    let holder = await generic.deleteOne({ _id })
    if (holder) {
      return holder
    } else {
      return false
    }
  }
}

module.exports = adapter