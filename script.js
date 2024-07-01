document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const orderList = document.getElementById('orderList');

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const customerName = document.getElementById('customerName').value;
        const product = document.getElementById('product').value;

        const order = { customerName, product };

        await fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        document.getElementById('customerName').value = '';
        document.getElementById('product').value = '';

        loadOrders();
    });

    async function loadOrders() {
        const response = await fetch('http://localhost:8080/orders');
        const orders = await response.json();
        orderList.innerHTML = '';
        orders.forEach(order => {
            const li = document.createElement('li');
            li.innerHTML = `${order.customerName} - ${order.product} <button onclick="deleteOrder('${order.id}')">Delete</button>`;
            orderList.appendChild(li);
        });
    }

    window.deleteOrder = async (id) => {
        await fetch(`http://localhost:8080/orders/${id}`, {
            method: 'DELETE'
        });
        loadOrders();
    };

    loadOrders();
});
