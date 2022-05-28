<?php

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\User::create([
            'name'       =>'Ahmed Nabil',
            'email'      =>'ahmednassag@gmail.com',
            'password'   =>bcrypt('0101685643320111993'),
            'profile_img'=>'profile_img1.jpg',
            'is_admin'   =>true
        ]);
    }
}
