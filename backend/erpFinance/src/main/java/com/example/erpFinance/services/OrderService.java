package com.example.erpFinance.services;


import com.example.erpFinance.models.Order;
import com.example.erpFinance.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * The Service layer for managing Order entities.
 * This class encapsulates the business logic for order-related actions
 * and acts as an intermediary between the controller and the repository.
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Retrieves all orders from the database.
     *
     * @return a list of all Order entities.
     */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Retrieves a single order by its ID.
     *
     * @param id the ID of the order to retrieve.
     * @return an Optional containing the Order if found, otherwise an empty Optional.
     */
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    /**
     * Creates a new order in the database.
     *
     * @param order the Order entity to save.
     * @return the saved Order entity.
     */
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    /**
     * Updates an existing order.
     *
     * @param id the ID of the order to update.
     * @param updatedOrder the new Order data.
     * @return an Optional containing the updated Order if successful, otherwise an empty Optional.
     */
    public Optional<Order> updateOrder(Long id, Order updatedOrderData) {
        // Find the existing order by ID.
        return orderRepository.findById(id).map(existingOrder -> {

            // Update the fields of the existing entity with the new data.
            // We check for null to allow for partial updates without overwriting existing data.
            if (updatedOrderData.getOrderDate() != null) {
                existingOrder.setOrderDate(updatedOrderData.getOrderDate());
            }
            if (updatedOrderData.getStatus() != null) {
                existingOrder.setStatus(updatedOrderData.getStatus());
            }
            if (updatedOrderData.getPaymentStatus() != null) {
                existingOrder.setPaymentStatus(updatedOrderData.getPaymentStatus());
            }
            if (updatedOrderData.getTotal() != null) {
                existingOrder.setTotal(updatedOrderData.getTotal());
            }

            // IMPORTANT: The customer and inventory links might also need to be updated.
            // If you want to allow changing the customer or inventory item for an order,
            // you'll need to add a similar null check for these fields.
            if (updatedOrderData.getCustomer() != null && updatedOrderData.getCustomer().getId() != null) {
                existingOrder.setCustomer(updatedOrderData.getCustomer());
            }
            if (updatedOrderData.getInventory() != null && updatedOrderData.getInventory().getId() != null) {
                existingOrder.setInventory(updatedOrderData.getInventory());
            }

            // Save the modified entity back to the database.
            return orderRepository.save(existingOrder);
        });
    }

    /**
     * Deletes an order by its ID.
     *
     * @param id the ID of the order to delete.
     * @return true if the order was deleted, false otherwise.
     */
    public boolean deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
