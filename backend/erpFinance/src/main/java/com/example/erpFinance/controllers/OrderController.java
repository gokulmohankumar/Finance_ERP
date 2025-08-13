package com.example.erpFinance.controllers;


import com.example.erpFinance.models.Order;
import com.example.erpFinance.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The REST API controller for the Order entity.
 * It handles incoming HTTP requests and delegates the business logic
 * to the OrderService.
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Endpoint to retrieve all orders.
     *
     * @return a list of all orders.
     */
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    /**
     * Endpoint to retrieve a single order by ID.
     *
     * @param id the ID of the order.
     * @return a ResponseEntity with the Order if found, or a NOT_FOUND status.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Endpoint to create a new order.
     *
     * @param order the Order object to create.
     * @return a ResponseEntity with the created Order and a CREATED status.
     */
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    /**
     * Endpoint to update an existing order.
     *
     * @param id the ID of the order to update.
     * @param order the new Order data.
     * @return a ResponseEntity with the updated Order if successful, or a NOT_FOUND status.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        return orderService.updateOrder(id, order)
                .map(updatedOrder -> new ResponseEntity<>(updatedOrder, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Endpoint to delete an order by ID.
     *
     * @param id the ID of the order to delete.
     * @return a ResponseEntity with a NO_CONTENT status if deleted, or a NOT_FOUND status.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderService.deleteOrder(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

