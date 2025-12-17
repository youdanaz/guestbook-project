package org.example.guestbook.controller;

import org.example.guestbook.domain.Guestbook;
import org.example.guestbook.repository.GuestbookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/guestbook")
public class GuestbookController {

    private final GuestbookRepository repository;

    public GuestbookController(GuestbookRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Guestbook> list() {
        return repository.findAll();
    }

    @PostMapping
    public Guestbook create(@RequestBody Guestbook guestbook) {
        return repository.save(guestbook);
    }
}