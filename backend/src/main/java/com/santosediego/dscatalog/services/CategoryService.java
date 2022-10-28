package com.santosediego.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.santosediego.dscatalog.dto.CategoryDTO;
import com.santosediego.dscatalog.entities.Category;
import com.santosediego.dscatalog.repositories.CategoryRepository;
import com.santosediego.dscatalog.services.exceptions.DatabaseException;
import com.santosediego.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAllPaged(Pageable pageable) {
		Page<Category> list = repository.findAll(pageable);

		// Utilizando lambda;
		return list.map(x -> new CategoryDTO(x));
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		try {
			Category entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new CategoryDTO(entity);
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
// CategoryDTO e após converto novamente essa stream para uma lista;

//Para tratar a exceção do id inexistente usar o orElseThrow fazendo uma expressão com uma classe
// criada para exceção;
//Criar uma classe para tratar essa exceção no resource;