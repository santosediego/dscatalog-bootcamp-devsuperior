package com.santosediego.dscatalog.tests.services;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.santosediego.dscatalog.entities.Product;
import com.santosediego.dscatalog.repositories.ProductRepository;
import com.santosediego.dscatalog.services.ProductService;
import com.santosediego.dscatalog.services.exceptions.DatabaseException;
import com.santosediego.dscatalog.services.exceptions.ResourceNotFoundException;
import com.santosediego.dscatalog.tests.factory.ProductFactory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests { // Aula 08-24

	// Para o objeto principal que estiver testando, colocar essa anotation;
	@InjectMocks
	private ProductService service;

	// Para os objetos dependêntes colocamos essa anotation, quando se carrega o
	// contexto da aplicação, utilizar MockBean. Doc Professor;
	// Quando se utiliza o Mock deve-se configurar o comportamento simulado dele;
	@Mock
	private ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private Product product;
	private PageImpl<Product> page;

	@BeforeEach
	void setup() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
		product = ProductFactory.createProduct();
		page = new PageImpl<>(List.of(product));

		// Configurando o comportamento simulado usand Mockito;
		
		Mockito.when(repository.find(ArgumentMatchers.any(), ArgumentMatchers.anyString(), ArgumentMatchers.any()))
			.thenReturn(page);
		
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);

		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());

		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}

	@Test
	public void deleteShouldDatabaseExceptionWhenDependentId() {

		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}

	@Test
	public void deleteShouldResourceNotFoundExceptionWhenIdDoesNotExist() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {

		// Verifia se roda sem retornar nenhuma exceção;
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});

		// Verifica se o repository (simulado Mock) foi chamado;
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
		// É possível no verify analisar quantas vezes foi chamado como o
		// Mokito.times(1) dentro do verify e outros;
	}
}