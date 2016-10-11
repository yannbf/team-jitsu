
export default class Api {
  constructor() {
    this.teams = [];
  }

  json(response) {
    return response.json(); 
  } 

  status(response) {   
    if (response.status >= 200 && response.status < 300) {  
      return Promise.resolve(response)  
    } else {  
      return Promise.reject(new Error(response.statusText))  
    }  
  }

  getTeamIds() {  
    var that = this;
    return new Promise((resolve, reject) => {
        const apiURL = "http://jiujitsuteam.herokuapp.com/teams.json";
        fetch(apiURL, {
            method: 'get' 
        })
        .then(that.status)
        .then(that.json) 
        .then(data => { 
            var ids = data.map(item => item.id);
            resolve(ids);
        })
        .catch(error => {  
          reject('Request failed -', error);  
        }); 
    })
  }

  getTeamInfo(id) { 
    const apiURL = "http://jiujitsuteam.herokuapp.com/teams/" + id + ".json";
    // get req to teams/id.json
    return new Promise((resolve, reject) => {
      fetch(apiURL, {
          method: 'get' 
      })
      .then(this.status)
      .then(this.json)
      .then(data => { 
        let { id, name, full_path, places} = data;
        let team = {
          id,
          name,
          full_path, 
          leader: data.leaders.map(leader => leader.profile.name),
          gyms: !places ? [] : places.map(item => item.gym),
        } 

        resolve(team);
      })
      .catch(error => console.log('Request failed -', error)); 
    });
  }

  fetchData() {
    var that = this;

    return new Promise((resolve, reject) => {
      that.getTeamIds().then(ids => {
        resolve(Promise.all(ids.map(id => that.getTeamInfo(id))));
        })
        .catch(error => reject("Fetching failed!" + error));
    });
  }

  

  getMockData() {
    var teams = [
      {
        id: 1,
        name: "Teste",
        nickname: "Testy",
        image: "...",
        gym: {
          coach: "Iglesias",
          address: "Rua Mota machado 20",
          name: "Academasya",
          latLong:[-3.734464116057717,-38.46957206726074]
        },
      },
      {
        id: 2,
        name: "Teste2",
        nickname: "asTesty",
        image: "...",
        gym: {
          coach: "Johaness",
          address: "Rua ministro eduardo 20",
          name: "2Academya",
          latLong:[-3.72464116057717,-38.46957206726074]
        },
      }
    ]  
    return teams;
  }
}
