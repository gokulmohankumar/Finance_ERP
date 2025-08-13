package com.example.erpFinance.services;

import com.example.erpFinance.models.Customer;
import com.example.erpFinance.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * The Service layer for managing Customer entities.
 * This class encapsulates the business logic and acts as an
 * intermediary between the controller and the repository.
 */
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Optional<Customer> updateCustomer(Long id, Customer updatedCustomerData) {
        // Step 1: Find the existing customer by ID.
        // We use Optional to handle the case where the customer is not found.
        Optional<Customer> existingCustomerOptional = customerRepository.findById(id);

        if (existingCustomerOptional.isPresent()) {
            Customer existingCustomer = getCustomer(updatedCustomerData, existingCustomerOptional);

            // Step 3: Save the modified entity back to the database.
            // This will trigger the actual UPDATE SQL command.
            Customer savedCustomer = customerRepository.save(existingCustomer);

            // Step 4: Return the saved entity.
            return Optional.of(savedCustomer);
        } else {
            // Return an empty optional if the customer was not found.
            return Optional.empty();
        }
    }

    private static Customer getCustomer(Customer updatedCustomerData, Optional<Customer> existingCustomerOptional) {
        Customer existingCustomer = existingCustomerOptional.get();

        // Step 2: Update the fields of the existing entity with the new data.
        // This is the crucial step you might be missing.
        existingCustomer.setName(updatedCustomerData.getName());
        existingCustomer.setContactInfo(updatedCustomerData.getContactInfo());
        existingCustomer.setCreditLimit(updatedCustomerData.getCreditLimit());
        existingCustomer.setOutstandingPayments(updatedCustomerData.getOutstandingPayments());
        existingCustomer.setRemarks(updatedCustomerData.getRemarks());
        return existingCustomer;
    }

    public boolean deleteCustomer(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
