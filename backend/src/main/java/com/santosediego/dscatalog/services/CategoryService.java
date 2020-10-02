package com.santosediego.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.santosediego.dscatalog.dto.CategoryDTO;
import com.santosediego.dscatalog.entities.Category;
import com.santosediego.dscatalog.repositories.CategoryRepository;
import com.santosediego.dscatalog.services.exceptions.EntityNotFoundException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		List<Category> list = repository.findAll();

		// Uma forma não resumida;
//		List<CategoryDTO> listDTO = new ArrayList<>();
//		for(Category cat : list) {
//			listDTO.add(new CategoryDTO(cat));
//		}
//		return listDTO;

		// Utilizando lambda;
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new EntityNotFoundException("Entity not found"));
		return new CategoryDTO(entity);
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