export const userLogin = async (loginData) => {
    const URL_API = "http://localhost:3001/api/v1/user/login";

    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'La connexion a échoué');
        }

        const data = await response.json();
        console.log('Login response data:', data);
        
        if (data.status === 200) { 
            return {
                status: data.status,
                message: data.message,
                token: data.body.token,
                email: data.body.email || '',
                firstName: data.body.firstName || '',
                lastName: data.body.lastName || ''
            };
        } else {
            return {
                status: data.status,
                message: data.message
            };
        }

    } catch (error) {
        console.error('Erreur de récupération:', error);
        throw new Error('Une erreur s’est produite lors de la récupération des données.');
    }
};
