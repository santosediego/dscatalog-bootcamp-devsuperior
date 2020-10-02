package com.santosediego.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.santosediego.dscatalog.entities.Category;
import com.santosediego.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	@Transactional(readOnly = true)
	public List<Category> findAll() {
		return repository.findAll();
	}
}
//@Transactional para garantir a integridade das transações;
//(readOnly = true) evita que faça lokin no bd, likin trava o bd, é sempre
//bom colocar isso quando for somente leitura.