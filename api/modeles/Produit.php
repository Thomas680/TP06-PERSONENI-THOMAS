<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Produit
 *
 * @ORM\Table(name="produit")
 * @ORM\Entity
 */
class Produit
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="titre", type="string", length=50, nullable=true)
     */
    private $titre;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @var float|null
     *
     * @ORM\Column(name="prix", type="float", precision=10, scale=0, nullable=true)
     */
    private $prix;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set titre.
     *
     * @param string|null $titre
     *
     * @return Produit
     */
    public function setTitre($titre = null)
    {
        $this->titre = $titre;

        return $this;
    }

    /**
     * Get titre.
     *
     * @return string|null
     */
    public function getTitre()
    {
        return $this->titre;
    }

    /**
     * Set description.
     *
     * @param string|null $description
     *
     * @return Produit
     */
    public function setDescription($description = null)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set prix.
     *
     * @param float|null $prix
     *
     * @return Produit
     */
    public function setPrix($prix = null)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get prix.
     *
     * @return float|null
     */
    public function getPrix()
    {
        return $this->prix;
    }
}
