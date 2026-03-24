import axios from 'axios';

const URL = 'http://localhost:3001/persons';

const getAll = async () => {
    const response = await axios.get(URL);
    const data = response.data;
    return data;
};

const createPerson = async (persons) => {
    const response = await axios.post(URL, persons);
    const data = response.data;
    return data;
};

const deletePerson = async (personId) => {
    const response = await axios.delete(`${URL}/${personId}`);
    const data = response.data;
    return data;
};

const updatePerson = async (personId, updatedPerson) => {
    const response = await axios.put(`${URL}/${personId}`, updatedPerson);
    const data = response.data;
    return data;
};

export default { getAll, createPerson, deletePerson, updatePerson };
