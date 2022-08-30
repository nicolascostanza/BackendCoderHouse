const createProduct = async () => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    try {
        const data = { title, price, thumbnail}
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        console.log(result);
        return result

    } catch (error) {
        const err = new Error(error)
        return err
    }
}