export default class ApiService {

    static getData = (projectName) => {
        return fetch('./api/mockData.json')
    }
}