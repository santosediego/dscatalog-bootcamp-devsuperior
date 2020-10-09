package com.santosediego.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.santosediego.dscatalog.dto.ProductDTO;
import com.santosediego.dscatalog.entities.Product;
import com.santosediego.dscatalog.repositories.ProductRepository;
import com.santosediego.dscatalog.services.exceptions.DatabaseException;
import com.santosediego.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) {
		Page<Product> list = repository.findAll(pageRequest);

		// Utilizando lambda;
		return list.map(x -> new ProductDTO(x));
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		//entity.setName(dto.getName());
		entity = repository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getOne(id);
			//entity.setName(dto.getName());
			entity = repository.save(entity);
			return new ProductDTO(entity);
		}catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	//Delete não insere o @Transational para conseguirmos capturamos uma execeção do bd;
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
}
//@Transactional para garantir a integridade das transações;
//(readOnly = true) evita que faça lokin no bd, likin trava o bd, é sempre é bom colocar isso 
//quando for somente leitura.

//Lambda = converte a lista para stream e utilizando o map convert esse stream para um 
// ProductDTO e após converto novamente essa stream para uma lista;

//Para tratar a exceção do id inexistente usar o orElseThrow fazendo uma expressão com uma classe
// criada para exceção;
//Criar uma classe para tratar essa exceção no resource;