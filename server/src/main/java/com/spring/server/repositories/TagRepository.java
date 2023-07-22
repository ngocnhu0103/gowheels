package com.spring.server.repositories;

import com.spring.server.models.Category;
import com.spring.server.models.Tag;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface TagRepository extends CrudRepository<Tag,Long> {
    public Tag findByTagName(String tagName);


}
