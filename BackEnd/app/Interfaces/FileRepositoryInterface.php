<?php

namespace App\Interfaces;

interface FileRepositoryInterface
{

    public function create(array $data);
    public function delete($fileUrl);
}
