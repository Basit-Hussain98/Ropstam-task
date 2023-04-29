export default class CommonService {
    static handleInputChange(e, model) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;
        model[name] = value;
        return {...model};
    }
}